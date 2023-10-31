from collections import defaultdict
import csv
import itertools

# Reads Csv File
def read_csv(file_path):
    t_data=[]
    with open(file_path, newline='') as csvfile:
        csvreader = csv.reader(csvfile)
        for i, row in enumerate(csvreader):
            row_data=[]
            i_data=[]
            for j, val in enumerate(row):
                if j==0:
                    row_data.append(val)
                    continue

                if val != '':
                    i_data.append(val)

            row_data.append(i_data)
            t_data.append(row_data)

    return t_data


# Finds unique Items
def find_unique_items(i_list):
    temp_list=[]

    for item in i_list:
        if item not in temp_list:
            temp_list.append(item)

    temp_list.sort()

    return temp_list

min_support = 2
data = read_csv("input.csv")

Count = defaultdict(int)
for items in data:
    for item in items[1]:
        Count[item] += 1
freq_set = dict((item, support) for item, support in Count.items() if support >= min_support)

k = 2
while True:
    Count = defaultdict(int)
    for items in data:
        item= set(items[1])
        for subset in itertools.combinations(item, k):
            Count[subset] += 1
    freq_set = dict((item, support) for item, support in Count.items() if support >= min_support)
    if len(freq_set) == 0:
        break
    k += 1



def calculateConfidence(items, tData):
    count=0
    for item in tData:
        mSet= set(item[1])
        cSet= set(items)

        if cSet.issubset(mSet):
            count+=1
        # print(cSet, mSet, count)
    return count

def confidence(transactionData):
    inputStr= input('Enter transactions: ')
    inputStr= inputStr.replace(' ', '')
    # print(inputStr)
    parseInputStr= inputStr.split("->")
    leftItems= parseInputStr[0].split(",")
    rightItems= parseInputStr[1].split(",")


    denominator= calculateConfidence(leftItems, transactionData)
    nominator= calculateConfidence(leftItems+rightItems, transactionData)
    confidenceVal=0
    if nominator==0:
        return 0
    else:
        confidenceVal=(nominator/denominator)*100.0
        return confidenceVal

print("\nConfidence: ", confidence(data),"%")