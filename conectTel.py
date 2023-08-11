import time, os
from selenium import webdriver
from dotenv import load_dotenv

config = load_dotenv(".env")

loadName = os.getenv('NAMESTEL')
loadIp = os.getenv('IP_ADDRESS')
user = os.getenv('USUARIO')
password = os.getenv('CONTRASENA')

def parseStrDic(keys:str, values:str):
  keys = loadName.split(":")
  values = loadIp.split("|")
  ipConted = {}
  for i in range(len(keys)):
    ipConted[keys[i]] = values[i]
  return ipConted

ipConted = parseStrDic(loadName, loadIp)

def conectTel(user:str, password:str, ipTel:dict):
  
  driver = webdriver.Edge()
  
  for name, ip in ipTel.items():
    print("Se Revisará Teléfono: " + name )
    
    ### TODO: Datos de ingreso a la página
    driver.get('http://'+ip+'/servlet?p=login&q=loginForm&jumpto=status')
    time.sleep(1) # esperar 1 seg para la pág
    driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[3]/td[2]/input').send_keys(user)
    driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[4]/td[2]/input[1]').send_keys(password)
    driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[5]/td/input[1]').click()
    time.sleep(1) # Tiempo para que valide las credenciales
    ### ??? Asginamos el estado de la Cuenta 1 y Cuenta 2 por el momento esta con validaciones de (strings)
    Acount_01 =  driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[2]/td[3]").text
    Acount_02 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[3]/td[3]").text
    
    print(Acount_01)
    print(Acount_02)
    print(name)
  

conectTel(user, password, ipConted)