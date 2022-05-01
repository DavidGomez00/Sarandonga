import requests
from bs4 import BeautifulSoup
import sys
import xlrd
import xlwt
#ABRIR ARCHIVO
archivo = 'C:/Users/pablo/Desktop/Hackaton/URL.xls'
wb = xlrd.open_workbook(archivo)
hoja = wb.sheet_by_index(0)

#GENERAR ARCHIVO SOLUCION
writeBook= xlwt.Workbook(encoding='utf-8')
sheet = writeBook.add_sheet("document",cell_overwrite_ok=True)
style = xlwt.XFStyle()

name = []
url = []
urlExtra =[]
for i in range (0, hoja.nrows): #Obtenemos los nombres de locales con + en vez de espacios
    name.append(hoja.cell_value(i, 0))
    url.append(hoja.cell_value(i, 1))
    urlExtra.append(hoja.cell_value(i, 2))


elementoAnterior = None
n = 0
while (len(name) > 0):
    nextName = name[0]
    nexturl = url[0]
    nextExtra = urlExtra[0]
    if (elementoAnterior != name[0]):
        if(nexturl != '' and nextExtra != ''):
            ######## GUARDAMOS DATOS EN EXCEL ######
            sheet.write(n, 0, nextName)
            sheet.write(n, 1, nexturl)
            sheet.write(n, 2, nextExtra)
            writeBook.save("Clear.xls")
            name.remove(nextName)
            url.remove(nexturl)
            urlExtra.remove(nextExtra)
            n += 1
    else:
        print("Repetido")
        name.remove(nextName)
        url.remove(nexturl)
        urlExtra.remove(nextExtra)
    elementoAnterior = nextName
