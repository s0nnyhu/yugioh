import re

with open('list_cards_number.txt') as f:
    lines = f.read().replace('\n', '')
    x = str(lines).replace('zéro', '0').replace('  ', ' ').split(' ')
    for i in range(0, len(x)):
        x[i] = int(x[i])
    x.sort()
    my_dict = {i: x.count(i) for i in x}

print("Total: " + str(len(x)))
with open('template_booster.txt', 'r') as file:
    # read a list of lines into data
    data = file.readlines()

for i in range(0, len(data)):
    # get number of card from id of the card from template
    rawId = str(data[i].split(";")[0].split('-')[1])
    idCard = str(re.findall('[0-9]+', rawId)[0]).lstrip('0') or '0'
    nbCard = my_dict.get(int(idCard)) if my_dict.get(int(idCard)) else 0
    # Replace
    data[i] = data[i].replace("\n", "") + "; " + str(nbCard) + "\n"

with open('template_booster_updated.txt', 'w') as file:
    file.writelines(data)
