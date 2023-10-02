#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#include <WifiLocation.h>
const char* googleApiKey = "YOUR_GOOGLE_API_KEY";

const char *ssid = "Majdi";
const char *password = "G468100G";

const char *host = "http://192.168.0.112:8000/api/location";

int worker_id = 7;
float longitude = 30.7348;
float latitude = 45.3234;

WiFiClient client;

WifiLocation location (googleApiKey);

void setClock () {
    configTime (0, 0, "pool.ntp.org", "time.nist.gov");

    Serial.print ("Waiting for NTP time sync: ");
    time_t now = time (nullptr);
    while (now < 8 * 3600 * 2) {
        delay (500);
        Serial.print (".");
        now = time (nullptr);
    }
    struct tm timeinfo;
    gmtime_r (&now, &timeinfo);
    Serial.print ("\n");
    Serial.print ("Current time: ");
    Serial.print (asctime (&timeinfo));
}


void setup() {
  delay(1000);
  Serial.begin(115200);
  WiFi.mode(WIFI_OFF);
  delay(1000);
  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, password);
  Serial.println("");

  Serial.print("Connecting");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // http.begin(client, host);
  location_t loc = location.getGeoFromWiFi();

    Serial.println("Location request data");
    Serial.println(location.getSurroundingWiFiJson()+"\n");
    Serial.println ("Location: " + String (loc.lat, 7) + "," + String (loc.lon, 7));
    //Serial.println("Longitude: " + String(loc.lon, 7));
    Serial.println ("Accuracy: " + String (loc.accuracy));
    Serial.println ("Result: " + location.wlStatusStr (location.getStatus ()));
}

void loop() {
  StaticJsonDocument<200> doc;
  HTTPClient http;
  // String postData = "worker_id=" + String(worker_id) + "&longitude=" + String(longitude)  + "&latitude=" + String(latitude);

  String jsonPayload = "{\"longitude\":\"" + String(longitude) + "\","
                     "\"latitude\":\"" + String(latitude) + "\","
                     "\"worker_id\":\"" + String(worker_id) + "\""
                     "}";
  
    doc["worker_id"] = worker_id;
    doc["longitude"] = longitude;
    doc["latitude"] = latitude;

    String json;
    serializeJson(doc, json);


  http.begin(client, host);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(jsonPayload);
  Serial.print("HTTP Response Code: ");
  Serial.println(httpResponseCode);

  String response = http.getString();
  Serial.println("Response Body:");
  Serial.println(response);

  http.end();
  delay(20000);
}
