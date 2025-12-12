# Run Screen State Machine

## RunSessionState
- IDLE
- RUNNING
- FINISHING
- FINISHED

## CurrentAction (Orthogonal State)
- label
- kind (work / break / neutral)
- theme
- pace

## Transition Rules
- Action 변경은 RUNNING 상태에서만 가능
- END는 RUNNING 상태에서만 가능

mermaid
stateDiagram-v2
    IDLE --> RUNNING
    RUNNING --> RUNNING: Action Switch
    RUNNING --> FINISHING: END
    FINISHING --> FINISHED