with open('list_cards_number.txt') as f:
    lines = f.read().replace('\n', '')
    x = str(lines).replace('zÃ©ro', '0').split(' ')
    x.sort()
    my_dict = {i: x.count(i) for i in x}

for x in my_dict:
    print(str(x) + ":" + str(my_dict[x]))
