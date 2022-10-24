constante = -7.547078


def factorEdadCalculator(edad: int):
  if edad >119:
    raise ValueError
  if edad < 0:
    raise ValueError
  if edad <= 19:
    return 0
  elif edad <= 29:
    return -1.458102
  if edad <= 39:
    return -1.196494
  elif edad <= 49:
    return -0.9109254
  elif edad <= 59:
    return 1.888158
  if edad <= 69:
    return 2.93897
  if edad <= 79:
    return 3.774616
  if edad >=80:
    return 4.456995
  


def nombre():
  while True:
    try:
      nombre = input('Ingrese su nombre: \n')
      if len(nombre) < 2:
        raise ValueError
      return nombre
    except ValueError:
      print('Ingrese una respuesta valida\n')
  
def genero():
  
  while True:
    try:
      vgenero = input('Genero: Ingrese "m" si es mujer o "h" si es hombre: \n')
      if vgenero.lower() == "m":
        return 0
      if vgenero.lower() == "h":
        return 0.6176118
      else:
        raise ValueError
    except:
      print("Ingrese una respuesta valida\n")
    
def edad(fn: callable):
  while True:
    try:
      edad = int(input('Ingrese su edad: \n'))
      return fn(edad)
    except ValueError:
      print('Ingrese una respuesta valida\n')
  


def pFallece(riesgo):
  try:
    return (2.71828**riesgo)/(1 + 2.71828**riesgo)
  except:
    print("Ingrese una respuesta valida\n")



def comorbilidad(enfermedad: str, factor: float):
  while True:
    try:
      h = input(f'¿Tiene usted {enfermedad}? ')
      if h.lower() == 's':
        return factor
      if h.lower() == 'n':
        return 0
      else:
        raise ValueError
    except ValueError:
      print('Ingrese una respuesta valida')

def continuar():
  

  while True:
    askContinue = input('\n\n¿Desea ingresar un nuevo paciente?Responda "s" para si y "n" para no:\n')
    try:
      if askContinue.lower() == "s":  
        return True
      elif askContinue.lower() == "n":
        return False
      else:
        raise ValueError        
    except ValueError:
      print("Ingrese una respuesta valida\n")



listaPacientes = [["Nombre","Probabilidad"]]
condition = True
  
  

while condition == True:
  newPatient = []
  newPatient.append(nombre())
  factorGenero = genero()
  factorEdad = edad(factorEdadCalculator)
  
  print('Responda "s" para si y "n" para no:\n')
  
  factorComorbilidad = sum((
    comorbilidad('hipertensión', 2.003496),
    comorbilidad('diabetes', 2.21035),
    comorbilidad('alguna enfermedad cardiaca', 2.550317),
    comorbilidad('alguna enfermedad respiratoria crónica', 2.036501),
    comorbilidad('algun tipo de cáncer', 1.925291),
  ))
  
  probabilidadFallecimiento = pFallece(constante + factorGenero + factorEdad + factorComorbilidad)

  print(f'Probabilidad de fallecimiento\t: {probabilidadFallecimiento * 100} %')
  newPatient.append(probabilidadFallecimiento)

  listaPacientes.append(newPatient)
  print('\n')
  print('===============Lista de Pacientes===============') 
  
  for name, pr in listaPacientes:
    print(f'{name}\t\t\t\t\t{pr}')
  print('\n')

  askContinue = False
  askContinue = continuar()  
  condition = askContinue
  if !continuar(): 
    break

  
  

  






  