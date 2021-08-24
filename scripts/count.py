with open('list_cards_number.txt') as f:
    lines = f.read().replace('\n', '')
    x = str(lines).replace('zéro', '0').replace('  ', ' ').split(' ')
    print(x)
    print(len(x))
