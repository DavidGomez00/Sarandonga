import xlrd
import xlwt
from random import randint
from time import sleep

########################### GUARDAMOS DATOS EN EXCEL ##########################


archivo = 'C:/Users/pablo/Desktop/Hackaton/continuacion a.xls'
wb = xlrd.open_workbook(archivo)
hoja = wb.sheet_by_index(0)

Locales = []
for i in range (774, hoja.nrows, 2): #Obtenemos los nombres de locales con + en vez de espacios
    aux = hoja.cell_value(i, 1)
    Locales.append(aux.replace(' ','+'))




writeBook= xlwt.Workbook(encoding='utf-8')
sheet = writeBook.add_sheet("document",cell_overwrite_ok=True)
style = xlwt.XFStyle()

sheet.write(0, 3, 'AHHHHHHHHHH')
    writeBook.save("URL.xls")
'''
Locales = [1,2,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
url = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
urlExtra = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

for n in range(len(Locales)):
    sleep(randint(1,10))
    print("durmiendo")
    aux = Locales.remove(Locales[0])
    print(Locales)
    print(aux)
'''
