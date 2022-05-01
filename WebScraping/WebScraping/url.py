import requests
from bs4 import BeautifulSoup
import sys
import xlrd
import xlwt
#import pandas as pd
from random import choice
from random import randint
from time import sleep
'''
########################## OBTENER LISTA PROXIES ############################

def get_proxies():
    proxy_url = 'https://github.com/clarketm/proxy-list/blob/master/proxy-list-raw.txt'
    r= requests.get(proxy_url)
    soupproxy = BeautifulSoup(r.content, "html.parser").findAll(class_='blob-code blob-code-inner js-file-line')
    proxies = [proxy.text for proxy in soupproxy]
    return proxies

def get_random_proxy(proxies):
    return{"https" : choice(proxies)}

proxies = get_proxies()
#proxies = ['200.106.187.242:999','190.26.201.194:8080','103.171.5.129:8080','212.112.127.20:8080','85.25.95.117:5566',
#            '61.7.195.194:8080','31.14.124.3:8080','174.138.116.12:80','181.129.245.124:999','82.200.80.118:8080',
#            '190.107.224.150:3128','65.51.178.92:3128','85.25.95.117:5566','64.225.8.192:80','195.158.30.323:3128']

def get_working_proxies():
    working_proxies= []
    for i in range(40):
        proxy = get_random_proxy(proxies)
        print(f"using {proxy} ...")
        try:
            r= requests.get("https://www.google.com", proxies=proxy, timeout=3)
            if(r.status_code == 200):
                print('Working', r.status_code)
                working_proxies.append(proxy)
        except:
            pass
    return working_proxies

working_proxies= []
while (len(working_proxies) < 3):
    working_proxies.extend(get_working_proxies())

#proxy = choice(working_proxies)
#print(proxy)
'''
def get_html():
    #proxy = choice(working_proxies) # Obtener proxy
    r = requests.get(busqueda) # Peticion html
    if(r.status_code != 200):
        print('ERROR con url code : ', r.status_code)
        return None
    else:
        return r

def get_Parcialurls_on_search_page():
    soup = BeautifulSoup(r.text, 'html.parser')
    divs = soup.findAll(class_='css-1m051bw')
    #print("divs : ", divs)

    # Obtener todos los enlaces
    enlaces = []
    for div in divs:
        #print(div.get('href'), '\n')
        enlaces.append(div.get('href'))

    return enlaces

def get_first_result_on_search_page(enlaces):
    # Elimino enlaces basura
    if(len(enlaces) > 3): #por si no encuentra resultado
        firstEnlace = enlaces[3]
        enlaceParcial = enlaces[3]
        #print(firstEnlace)
        url = 'https://www.yelp.es' + firstEnlace
    else:
        enlaceParcial = ''
        url = ''
    result=[]
    result.append(enlaceParcial)
    result.append(url)
    return result

def get_urlExtra_of_local(enlaceParcial):

    #for e in enlaceParcial:
        #print(string.rpartition('?osq')[0].partition("/biz/")[2]
    if(enlaceParcial != ''):
        referName = enlaceParcial.rpartition('?osq')[0].partition("/biz/")[2] #Obtengo nombre de referencia del local
        urlExtra = 'https://www.yelp.es/not_recommended_reviews/' + referName
    else:
        urlExtra = ''
    return urlExtra

#def safe_on_excel(sheet, local, url, urlExtra):


########################## LEER NOMBRES DE EXCEL ############################

archivo = 'C:/Users/pablo/Desktop/Hackaton/Dataset.xlsx'
wb = xlrd.open_workbook(archivo)
hoja = wb.sheet_by_index(0)
#print(hoja.nrows)
#print(hoja.ncols)
#print(hoja.cell_value(0, 0))
##### PREPARAR EXCEL DE SALIDA #####
writeBook= xlwt.Workbook(encoding='utf-8')
sheet = writeBook.add_sheet("document",cell_overwrite_ok=True)
style = xlwt.XFStyle()

Locales = []
for i in range (774, hoja.nrows, 2): #Obtenemos los nombres de locales con + en vez de espacios
    aux = hoja.cell_value(i, 1)
    Locales.append(aux.replace(' ','+'))
#print(Locales)
print(Locales[0])
########################## OBTENCION DE ENLACE YELP #######################

#FORMATO URL https://www.yelp.es/search?find_desc=moog&find_loc=Barcelona&ns=1
#url = []
#urlExtra = []
#enlaceParcial = []

n = 0
for BarName in Locales:
    time = randint(1,90)
    print("Durmiendo "+ str(time) +" segundos")
    sleep(time)
    Location="Barcelona"
    busqueda = 'https://www.yelp.es/search?find_desc=' + BarName + '&find_loc=' + Location + '&ns=1'

    #busqueda = 'https://www.yelp.es/search?find_desc=Bar+musical+Com-tu&find_loc=Barcelona'
    #busqueda = 'https://www.yelp.es/search?find_desc=Bar+karaoke+Muntaner&find_loc=Barcelona&ns=1'
    print("trying search : " + busqueda)

    # Obtener HTML y limpiar la sopa
    r = get_html()

    if(r != None):
        enlaces = get_Parcialurls_on_search_page()

        aux = get_first_result_on_search_page(enlaces)
        enlaceParcial = aux[0]
        url = aux[1]

########################## OBTENCION DE ENLACE EXTRA YELP ####################
        urlExtra = get_urlExtra_of_local(enlaceParcial)
        #print(url)
        #string = '/biz/cassette-bar-barcelona-4?osq=Bar+musical+Com-tu'

########################### GUARDAMOS DATOS EN EXCEL ##########################

        sheet.write(n, 0, Locales[n].replace('+',' '))
        sheet.write(n, 1, url)
        sheet.write(n, 2, urlExtra)

        writeBook.save("URL.xls")
        n = n+1
