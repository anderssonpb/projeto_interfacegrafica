import schedule
import time 

def RodarScriptProjeto():
    print ('Iniciando script diario...')

#schedule.cada.tempo.fazer 
schedule.every().day.at("08:00").do(RodarScriptProjeto)

while 1:
    schedule.run_pending()
    time.sleep(1)
    