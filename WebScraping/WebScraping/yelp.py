import requests
from bs4 import BeautifulSoup
import sys
import os
import xlrd
import xlwt
import pandas as pd
import numpy as np
from nltk.corpus import stopwords
import nltk
from random import randint
from time import sleep
########################## FUNCIONES #############################
def save_coments (localname,reviews):
    fichero = 'C:/Users/pablo/Desktop/Hackaton/comentarios/' + localname + '.txt'
    file = open(fichero, "w")
    for div in reviews:
        #print(div.text, '\n')
        file.write(div + '\n')
    file.close()

def get_comments(url):
    r = requests.get(url)
    if(r.status_code != 200):
        print('ERROR con url code : ', r.status_code)

    soup = BeautifulSoup(r.text, 'html.parser')
    divs = soup.findAll(class_='raw__09f24__T4Ezm')
    #print(divs)

    reviews = []
    for div in divs:
        #print(div.text, '\n')
        reviews.append(div.text)

    if(len(reviews) > 4):
        reviews = reviews[4::]
    return reviews

########################## ENTRADA EXCEL ############################

archivo = 'C:/Users/pablo/Desktop/Hackaton/CDataBase.xls'
wb = xlrd.open_workbook(archivo)
hoja = wb.sheet_by_index(0)

writeBook= xlwt.Workbook(encoding='utf-8')
sheet = writeBook.add_sheet("document",cell_overwrite_ok=True)
style = xlwt.XFStyle()

name = []
url = []
urlExtra =[]
for i in range (92, hoja.nrows): #Obtenemos los nombres de locales con + en vez de espacios
    name.append(hoja.cell_value(i, 0))
    url.append(hoja.cell_value(i, 1))
    urlExtra.append(hoja.cell_value(i, 2))

########################## OBTENCION DE COMENTARIOS YELP #######################

#url = 'https://www.yelp.es/biz/moog-barcelona?osq=Discotecas'
generos = [["clásica","clasic","clasica","clasical"],["blues"],["jazz","jaz"],["rock and roll","rock & roll","rock&roll"],["rock"],
            ["r&b","rhythm and Blues", "ryb"],["gospel"],["soul"],["metal"],["punk"],["country"],["funk","fank"],
            ["disco","dance"],["haus","house"],["techno","tecno","tekno"],["pop"],["ska"],["reggae"],
            ["reggaeton","regi","rigi","latino","latina"],["drum & bass","drum&bass","drum and bass"],["garage"],["flamenco"],
            ["salsa"],["hiphop","hip-hop","hip hop"]]

#u = url
#e = ' '
#n= 'moog-barcelona'
cont = 1;
for n, u, e in zip(name, url, urlExtra):
    pesos = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    time = randint(1,10)
    print("Durmiendo "+ str(time) +" segundos")
    sleep(time)
    print("scanning : " + n)
    coments = get_comments(u)
    coments.extend(get_comments(e)) # JUNTO LSO COMENTARIOS NO DESEADOS
    save_coments(n, coments) # Guardo los datos en txt


    df = pd.DataFrame(np.array(coments), columns=['review'])
    nltk.download('stopwords')
    stop_words = stopwords.words('spanish')
    other_stopwords = ['si', 'arriba', 'aunque', 'barcelona', 'gente', 'puede', 'musica', 'ir' \
      'ambiente', 'música', 'puedes', 'mejor', 'decir', 'abajo', 'told', \
      'get', 'us', 'would', 'get', 'one', 'ive', 'go', 'even', \
      'also', 'ever', 'x', 'take', 'let' ]
    #df['stopword_coun'] = df['review'].apply(lambda x: len([x for x in x.split() if x in stop_words]))
    # Lower case all words
    df['review_lower'] = df['review'].apply(lambda x: " ".join(x.lower() for x in x.split()))
    # Remove Punctuation
    #df['review_nopunc'] = df['review_lower'].str.replace('[^\w\s]', '')
    # Remove Stopwords
    df['review_nopunc_nostop'] = df['review_lower'].apply(lambda x: " ".join(x for x in x.split() if x not in stop_words))

    # Return frequency of values
    df['review_nopunc_nostop_nocommon'] = df['review_nopunc_nostop'].apply(lambda x: "".join(" ".join(x for x in x.split() if x not in other_stopwords)))
    freq= pd.Series(" ".join(df['review_nopunc_nostop_nocommon']).split()).value_counts()
    #print(freq.index)
    #print(freq.values)

    palabrasfreq = freq.index
    repeticiones = freq.values
    a=0
    for g in generos:
        for y in g:
            #print(y)
            for i in range(0,len(palabrasfreq)):
                if(palabrasfreq[i].casefold() == y.casefold()):
                    #print("INCREMENTO : " + str(repeticiones[i]))
                    pesos[a] += repeticiones[i]
        a+=1
    #print(pesos)

    for b in name:
        sheet.write(cont,0,n)
    for x in range(0,len(pesos)):
        sheet.write(cont, x+1, int(pesos[x]))
    writeBook.save("pesos.xls")
    cont += 1
####################### SCRAAPING COMENTARIOS ##################################

#localname = 'moog-barcelona'
#fichero = 'C:/Users/pablo/Desktop/Hackaton/comentarios/' + localname + '.txt'
