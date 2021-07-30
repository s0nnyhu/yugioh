with open('list_cards_number.txt') as f:
    lines = f.read().replace('\n', '')
    x = str(lines).replace('zÃ©ro', '0').split(' ')
    for i in range(0, len(x)):
        x[i] = int(x[i])
    x.sort()
    my_dict = {i: x.count(i) for i in x}

print(my_dict)
with open('template_booster.txt', 'r') as file:
    # read a list of lines into data
    data = file.readlines()

for i in range(0, 101):
    nbCard = my_dict.get(i) if my_dict.get(i) else 0
    data[i] = data[i].replace("\n", "") + "; " + str(nbCard) + "\n"

with open('template_booster_updated.txt', 'w') as file:
    file.writelines(data)
