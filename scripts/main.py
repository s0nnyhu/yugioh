import sys
import pandas
import requests
import csv
import json

csvFileName = 'Yugioh Collection Cards - True Own Cards.csv'
yugiohApiEndpoint = 'https://db.ygoprodeck.com/'


def getCardPrice(cardName, cardSet, cardRarity):
    apiResponse = requests.get(
        yugiohApiEndpoint + 'queries/getPrices.php?cardone=' + cardName + "&vendor=Cardmarket")
    sets = apiResponse.json().get('set_info')
    allPrices = []
    price = "NA"
    if (sets):
        # API prices iteration
        for set in sets:
            if(cardSet == set['set']):
                allPrices.append(set['price'])
        # Starlight check
        if (cardRarity == 'Starlight Rare'):
            price = max(allPrices, default='NA')
        else:
            print(allPrices)
            price = min(allPrices, default='NA')
    return price


def setCardmarketPriceInCsv():
    data_df = pandas.read_csv(csvFileName)
    for index, row in data_df.iterrows():
        cardName = row['Card Name']
        cardSet = row['Set Name']
        cardRarity = row['Rarity']
        print(str(index) + " - " + cardName + " - " + cardSet)

        cardPrice = getCardPrice(cardName, cardSet, cardRarity)
        print("\t" + 'Price : ' + str(cardPrice))

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


if (sys.argv[1] == "cardprice"):
    print("Updating cardmarket price")
    print("-------------------------------------")
    setCardmarketPriceInCsv()
else:
    print("Generating JSON")
    print("-------------------------------------")
    generateJsonFromCsv()
