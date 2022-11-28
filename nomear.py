from datetime import timedelta, datetime

#nomear os arquivos de forma diária
currentDate = datetime.now()
for i in range(7, 0, -1):
    dayOfWeek = currentDate.strftime("%A")
    print( "{0} - {1}".format(i, dayOfWeek) )
    currentDate = currentDate - timedelta(days=1)