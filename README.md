##Arduino Script

This is for a hall sensor using an interrupt.

```c

int interruptPin = 2;
bool state = LOW;
bool lastState;

void setup() {
    pinMode(interruptPin, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(interruptPin), countSpeed, CHANGE);
    Serial.begin(9600);
  }

void loop() {
  // put your main code here, to run repeatedly:
  if (state != lastState) {
    Serial.println(state);
    lastState = state;
  }
}

void countSpeed() {
  state = !state;
}

```