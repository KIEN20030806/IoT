#include <SimpleDHT.h>
int pinDHT11 = 4;//
SimpleDHT11 dht11;

#include <WiFi.h>
#include <FirebaseESP32.h>

#define WIFI_SSID "IoT Lab"
#define WIFI_PASSWORD "IoT@123456"

#define FIREBASE_HOST "tt-iot-ute-default-rtdb.firebaseio.com"

/** The database secret is obsoleted, please use other authentication methods, 
 * see examples in the Authentications folder. 
*/
#define FIREBASE_AUTH "51DfTBzUyx0OX9uUqe4L4Aeg5j6rEjOZ7nd5Q3PN"

//Define FirebaseESP32 data object
FirebaseData fbdo;

FirebaseJson json;

void setup()
{
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

void loop()
{
  byte temperature = 0;
  byte humidity = 0;
  if (dht11.read(pinDHT11, &temperature, &humidity, NULL)) {
    Serial.print("Read DHT11 failed.");
    return;
  }
  Serial.print((int)temperature); Serial.print(" *C, "); 
  Serial.print((int)humidity); Serial.println(" %");

  delay(2000);
}
