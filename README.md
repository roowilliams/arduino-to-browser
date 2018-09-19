## Arduino Script

![Arduino to computer interaction]

[Demo]

[Demo]: https://raw.githubusercontent.com/roowilliams/arduino-to-browser/master/giphy.gif

This is for a hall sensor using an interrupt.

```c

int interruptPin = 2;
bool state = LOW;
bool lastState;

void setup() {
    // runs once
    pinMode(interruptPin, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(interruptPin), countSpeed, CHANGE);
    Serial.begin(9600);
  }

void loop() {
  // code here runs repeatedly in a loop
  if (state != lastState) {
    Serial.println(state);
    lastState = state;
  }
}

void countSpeed() {
  state = !state;
}

```