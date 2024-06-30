//This example shows how to read, store and update database using get, set, push and update functions.

#include <WiFi.h>
#include <FirebaseESP32.h>

#define WIFI_SSID "Kien"
#define WIFI_PASSWORD "09877891"

#define FIREBASE_HOST "buoi4-5d3df-default-rtdb.firebaseio.com"

/** The database secret is obsoleted, please use other authentication methods, 
 * see examples in the Authentications folder. 
*/
#define FIREBASE_AUTH "sSe4dKzRIQRVRsuBdK1xqrTr3UTQB8QmmpRihU60"

//Define FirebaseESP32 data object
FirebaseData fbdo;
int i;
#define LED 2

void setup()
{
  pinMode(LED, OUTPUT); 
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

  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(fbdo, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(fbdo, "tiny");
}
void loop()
{  
  if(Firebase.getString(fbdo, "/TT_IoT/BULB_01"))
  {
    Serial.println("Download success: " + String(fbdo.stringData()));
    if(fbdo.stringData() == "ON")
      digitalWrite(LED, HIGH);
    else
      digitalWrite(LED, LOW);   
  }else {
    Serial.println("Download fail: " + String(fbdo.stringData())); 
  }
  delay(3000);
}

