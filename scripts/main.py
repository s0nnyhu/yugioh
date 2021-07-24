import sys
import pandas
import requests
import csv
import json

csvFileName = 'Yugioh colection - True Own Cards.csv'
yugiohApiEndpoint = 'https://db.ygoprodeck.com/api/v7/'


def getCardPrice(cardName):
    apiResponse = requests.get(
        yugiohApiEndpoint + 'cardinfo.php?name=' + cardName)
    cardPrice = apiResponse.json().get('data')[0].get(
        'card_prices')[0].get('cardmarket_price')
    return cardPrice


def removeCardNameEOLSpaceInCsv():
    data_df = pandas.read_csv(csvFileName)
    for index, row in data_df.iterrows():
        cardName = row['Card Name']
        print(str(index) + " - " + cardName)
        # Remove space EOL
        cardNameEOLSpaceRemoved = cardName.rstrip()

        # Replace cardname
        data_df.loc[data_df['Card Name'] == cardName,
                    'Card Name'] = cardNameEOLSpaceRemoved

        print("\t" + "> Card Name Updated")

    print("\nSaving all changes...")
    data_df.to_csv(csvFileName, index=False)
    print("Saved!")


def setCardmarketPriceInCsv():
    data_df = pandas.read_csv(csvFileName)
    for index, row in data_df.iterrows():
        cardName = row['Card Name']
        print(str(index) + " - " + cardName)

        cardPrice = getCardPrice(cardName)
        print("\t" + 'Price : ' + cardPrice)

        data_df.loc[data_df['Card Name'] == cardName,
                    'Cardmarket Price'] = cardPrice
        print("\t" + "> Cardmarket price updated")

    print("\nSaving all changes...")
    data_df.to_csv(csvFileName, index=False)
    print("Saved!")


def isLast(itr):
    old = itr.next()
    for new in itr:
        yield False, old
        old = new
    yield True, old


def generateJsonFromCsv():
    df = pandas.read_csv(csvFileName)
    df.to_json(path_or_buf='data.json', orient='records', lines=True)
    my_list = []
    with open(csvFileName) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            my_dict = {'year': row['Year'], 'card_set': row['Set Name'], 'language': row['Language'], 'card_id': row['Card #'], 'card_name': row['Card Name'],
                       'rarity': row['Rarity'], 'quantity':  row['Quantity'], 'card_edition':  row['Edition'], 'cardmarket_price': row['Cardmarket Price']}
            my_list.append(my_dict)
    with open('data.json', 'w') as outfile:
        json.dump(my_list, outfile, indent=4)


if (sys.argv[1] == "cardname"):
    print("Removing card name extra space at EOL")
    print("-------------------------------------")
    removeCardNameEOLSpaceInCsv()
elif (sys.argv[1] == "cardprice"):
    print("Updating cardmarket price")
    print("-------------------------------------")
    setCardmarketPriceInCsv()
else:
    print("Generating JSON")
    print("-------------------------------------")
    generateJsonFromCsv()
