import sys
import pandas
import requests

csvFileName = 'Yugioh colection - Own cards.csv'
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


if (sys.argv[1] == "cardname"):
    print("Removing card name extra space at EOL")
    print("-------------------------------------")
    removeCardNameEOLSpaceInCsv()
else:
    print("Updating cardmarket price")
    print("-------------------------------------")
    setCardmarketPriceInCsv()
