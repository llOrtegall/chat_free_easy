import time
from selenium import webdriver
import sys

dirrecionesIP = {
  "Desarrollo": "172.20.1.67",
  "Tesoreria": "172.20.1.170",
  "Aux_Comercial": "172.20.1.66",
  "Cartera": "172.20.1.68",
  "Contabilidad" :"172.20.1.171",
  "Director de Oficina": "172.20.1.169",
  "Contabilidad": "172.20.1.124",
  "Auditoria Yumbo": "172.20.1.151",
  "Talonarios": "172.20.1.36",
  "Almacen":"172.20.1.176",
  "Gestion_Humana":"172.20.1.37",
  "Porteria": "172.20.1.49",
}

driver = webdriver.Edge()

Usuario = 'admin'
Contrasena = 'oLUoXnsQ'

for nameTelefono, ipTelefono in dirrecionesIP.items():
  print("Se Revisará Teléfono: " + nameTelefono )
  
  ### TODO: Datos de ingreso a la página
  driver.get('http://'+ipTelefono+'/servlet?p=login&q=loginForm&jumpto=status')
  time.sleep(1) # esperar 1 seg para la pág
  user = driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[3]/td[2]/input')
  password = driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[4]/td[2]/input[1]')
  user.send_keys(Usuario)
  password.send_keys(Contrasena)
  login_btn = driver.find_element("xpath", '/html/body/div/form/table/tbody/tr[5]/td/input[1]').click()
  time.sleep(1) # Tiempo para que valide las credenciales
  ### ??? Asginamos el estado de la Cuenta 1 y Cuenta 2 por el momento esta con validaciones de (strings)
  Acount_01 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[2]/td[3]").text
  Acount_02 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[3]/td[3]").text
  
  def FirstOpc(op1):
    if(op1 == 'Desactivado'):
      op1 = 1
    else:
      op1 = 0
    return str(op1)
  
  res1 = FirstOpc(Acount_01)
  res2 = FirstOpc(Acount_02)
  ### TODO: Este Código Activará la Cuenta Número 1, Cuando ambas estan desactivadas
  if(res1 == res2):
    print("Cuenta_01 y Cuenta_02 ==> Estan Desactivadas, Se Activará Cuenta 1")
    try:
      ### TODO: Vamos a la cuenta
      cuenta = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/ul/li[2]/div[2]/label")
      cuenta.click()
      time.sleep(2) # tiempo para cargar la cuenta
      ### ? AUTOMATICAMENTE EL SE ENCONTRARÁ EN LA CUENTA 1 la cual debemos activar
      ### TODO Activamos la linea 1
      linea = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select")
      linea.click()
      activeLine = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select/option[2]")
      activeLine.click()
      # ? confirmarmos
      confirm = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/div/input[1]").click()
      time.sleep(5)
      
      ### TODO: Vamos a Estado
      cuenta = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/ul/li[1]/div[2]/label").click()
      time.sleep(5) # para que cargue estado
      state01 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[2]/td[3]").text
      print("Cuenta 1 Activada Correctamente y El Estado Es: " + state01)
      salir = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/div/div/label").click()
    except:
      ("error al activar la cuenta 1")
  else:
    print("Las Lineas 1 y Linea 2 No Se Encuentran Desactivadas, Se Procede a Verficar Estado")
    
  ### TODO: Este Código Activará La Cuenta, Cuando Reporte Un Error. 
  if(Acount_01.__contains__('Error de registo') and Acount_02.__contains__('Desactivado')):
    # ! ERROR (En Cuenta_01) ==> DEBEMOS ACTIVAR SEGUNDA CUENTA Y DESACTIVAR PRIMERA
    print("Cuenta # 1 => Tiene Estado: " + Acount_01 + ", Se Activará La Cuenta 2")
    try:
      ### TODO: Vamos a la cuenta
      cuenta = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/ul/li[2]/div[2]/label")
      cuenta.click()
      time.sleep(1) # tiempo para cargar cuenta
      ### TODO: Seleccionamos la cuenta 2
      cuenta2 = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[2]/td[3]/select").click()
      selectCuenta2 = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[2]/td[3]/select/option[2]").click()
      ### TODO Activamos la linea 
      linea = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select").click()
      activeLine = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select/option[2]").click()
      # ? Confirmarmos
      confirm = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/div/input[1]").click()
      time.sleep(5)
      ### TODO: Vamos a la cuenta
      cuenta = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/ul/li[2]/div[2]/label").click()
      time.sleep(1) # para cargar la cuenta
      ### TODO: Seleccionamos la cuenta 1
      cuenta1 = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[2]/td[3]/select").click()
      selectCuenta1 = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[2]/td[3]/select/option[1]").click()
      ### TODO Desactivamos la linea 
      linea = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select").click()
      desactiveLine = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select/option[1]").click()
      # ? Confirmarmos
      confirm = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/div/input[1]").click()
      ### TODO: Vamos a Estado
      cuenta = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/ul/li[1]/div[2]/label").click()
      time.sleep(1)
      state01 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[3]/td[3]").text
      print("Cuenta 1 Desactivada, Cuenta 2 Activada y El Estado Es: " + state01)
      salir = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/div/div/label").click()
    except:
      print("Error Al Activar La Cuenta 2")
  elif(Acount_02.__contains__('Error de registo') and Acount_01.__contains__('Desactivado')):
    # ! ERROR (En Cuenta_02) ==> DEBEMOS ACTIVAR PRIMERA CUENTA Y DESACTIVAR SEGUNDA
    print("Cuenta_02 Tiene Estado: " + Acount_02 + ", Se Activará La Cuenta 1")
    try:
      ### TODO: Vamos a la cuenta
      cuenta = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/ul/li[2]/div[2]/label").click()
      time.sleep(1) # para cargar la pag
      ### TODO Activamos la linea 
      linea = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select").click()
      activeLine = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select/option[2]").click()
      # ? Confirmarmos
      confirm = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/div/input[1]").click()
      time.sleep(5)
      ### TODO: Seleccionamos la cuenta 2
      cuenta2 = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[2]/td[3]/select").click()
      selectCuenta2 = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[2]/td[3]/select/option[2]").click()
      ### TODO Desactivamos la linea 
      linea = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select").click()
      desactiveLine = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/table/tbody[1]/tr[4]/td[3]/select/option[1]").click()
      # ? Confirmarmos
      confirm = driver.find_element("xpath", "/html/body/div/div[3]/div[3]/form/div/input[1]").click()
      time.sleep(5)
      ### TODO: Vamos a la Estado
      cuenta = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/ul/li[1]/div[2]/label").click()
      state01 = driver.find_element("xpath", "/html/body/div/div[3]/div[2]/table/tbody[7]/tr[2]/td[3]").text
      print("Cuenta 1 Desactivada, Cuenta 2 Activada y El Estado Es: " + state01)
      salir = driver.find_element("xpath", "/html/body/div/div[2]/div[2]/div/div/label").click()
      time.sleep(2)
    except:
      print("Error Al Activar La Cuenta 1")
  else:
    print("Teléfono: " +nameTelefono+ " Con Ip: "+ipTelefono+" Se Encuentra En Estado OK")
  print('=======================================================================================')
  
sys.exit()