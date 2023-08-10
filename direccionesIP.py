import time, os
from selenium import webdriver
from dotenv import load_dotenv
config = load_dotenv(".env")

driver = webdriver.Chrome()

dirrecionesIP = {
"Porteria": "172.20.1.49",
"Desarrollo":	"172.20.1.67",
"Tesoreria": "172.20.1.170",
"Aux_Comercial": "172.20.1.66",
"Cartera": "172.20.1.68",
"Contabilidad" :"172.20.1.171",
"Director de Oficina": "172.20.1.169",
"Contabilidad": "172.20.1.124",
"Auditoria Yumbo": "172.20.1.151",
"Talonarios": "172.20.1.36",
"Gestion_Humana":"172.20.1.37",
"Almacen":"172.20.1.176",
}

Usuario = os.getenv('USUARIO')
Contrasena = os.getenv('CONTRASENA')

# x = dirrecionesIP.get("Porteria")
# z = dirrecionesIP.keys()
# y = dirrecionesIP.values()
# w = dirrecionesIP.items()
# print(str(x))
# print(str(z))
# print(str(y))
# print(str(w))

for x in dirrecionesIP.values():
  print(str(x))
  
  ### TODO: Datos de ingreso a la página
  driver.get('http://'+x+'/servlet?p=login&q=loginForm&jumpto=status')
  time.sleep(1) # esperar 1 seg para la pág
  user = driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[3]/td[2]/input')
  password = driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[4]/td[2]/input[1]')
  user.send_keys(Usuario)
  password.send_keys(Contrasena)
  login_btn = driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[5]/td/input[1]')
  login_btn.click()
  time.sleep(2) # Tiempo para que valide las credenciales
  ### ??? Asginamos el estado de la Cuenta 1 y Cuenta 2 por el momento esta con validaciones de (strings)
  Acount_01 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[2]/td[3]").text
  Acount_02 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[3]/td[3]").text
  
  print(Acount_01)
  print(Acount_02)