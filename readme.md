# readme

## Objetivo:
Obtener los datos de un calendario de una cuenta de microsoft(Outlook y office365).

![Image](/img/img2.png)

## Aplicación:
Puesta en marcha:
Es necesario inicializar el servidor con el comando por terminal de node.js npm start en la ruta de "node-tutorial"

![Image](/img/img1.png)

## 5 rutas:
Calendar y mail estan implementadas.
Calendar en concreto tiene el apartado .api(...) que controla "me" hace referencia al correo logeado y hay código comentado para conectarse a otros. También es posible controlar la cantidad de citas que aparecen seleccionando un rango del mes en esta misma linea (de momento esta puesto desde un dia antes a 30 después con la particularidad de que las citas caducadas se marcan en rojo). La cantidad de citas máxima mostrada se controla mediante .top(x) siendo x el número deseado. Es posible conectarse a resources "en principio" si se obtienen los permisos mediante administrador.
Son accesibles mediante el login que hace redirección a calendar y mediante la ruta forzada localhost:3000/mail. Authorize e index controlan las rutas y el login. Tanto calendar.js como mail.js controlan los selects mediante .select para la información que luego usará.

![Image](/img/img3.png)

## 5 views: 
Mail y calendar implementadas. 

Calendar: 
-Controla el refresco de la aplicación cuando esta operativa y hay red. En caso de que no haya red no hace refresco hasta que haya.

-Controla los datos y hace las peticiones para mostrarlas en el html.

## Mail:
Esta oculto, se puede forzar la entrada mediante la ruta "localhost:3000/mail"
Controla los mismos datos que el calendar pero para el apartado de bandeja de entrada.

###### nota: Las demas views son partes del html con código fácil de entender.

## Auth.js en helpers/:
Controla los tokens y sus peticiones, también las coockies y la caducidad del token para pedir uno nuevo si este se ha actualizado, o el mismo si este ha fallado.

## Archivo .env:
Contiene los permisos de lectura de los calendarios y de los mails. También contiene la id y pass de la app registrada en dev.microsoft.

## App.js:
Controla las rutas y uses de la api
