#0.6
sequenceDiagram
participant browser
participant server
participant user

    user->>browser: "Hello World"
    user->>browser: Submit form
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa_new_note
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser re-renders the changed components. The page does not reload.
