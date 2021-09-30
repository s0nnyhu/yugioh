import re
import requests
from bs4 import BeautifulSoup
import sys


def getAndFillTemplateSet(setName):
    print("Set name : " + setName)
    print("> Getting cards list of that set...")
    res = requests.get(
        "https://yugioh.fandom.com/wiki/Set_Card_Lists:" + setName + "_(TCG-EN)?action=edit")
    soup = BeautifulSoup(res.text, 'html.parser')
    rawSetCards = soup.find_all('textarea')[0].get_text()
    nbRawSetCards = len(rawSetCards.split("\n"))
    splittedSetCards = rawSetCards.split("\n")[1:nbRawSetCards - 2]
    f = open("template_booster.txt", "w", encoding='utf-8')
    f.write("\n".join(splittedSetCards))
    f.close()
    print("> Succesffully written in template_booster.txt!")


getAndFillTemplateSet(sys.argv[1].replace(" ", "_"))

with open('list_cards_number.txt') as f:
    lines = f.read().replace('\n', '')
    if (len(lines) != 0):
        x = str(lines).replace('zéro', '0').replace('  ', ' ').split(' ')
        for i in range(0, len(x)):
            x[i] = int(x[i])
        x.sort()
        my_dict = {i: x.count(i) for i in x}

with open('template_booster.txt', 'r') as file:
    # read a list of lines into data
    data = file.readlines()
print("> Merging posessed card with template...")
for i in range(0, len(data)):
    # get number of card from id of the card from template
    rawId = str(data[i].split(";")[0].split('-')[1])
    idCard = str(re.findall('[0-9]+', rawId)[0]).lstrip('0') or '0'
    if (len(lines) != 0):
        nbCard = my_dict.get(int(idCard)) if my_dict.get(int(idCard)) else 0
    else:
        nbCard = 0
    # Replace
    data[i] = data[i].replace("\n", "") + "; " + str(nbCard) + "\n"

with open('template_booster_updated.txt', 'w') as file:
    file.writelines(data)
print("> Completed! Total: " + str(len(x)))
