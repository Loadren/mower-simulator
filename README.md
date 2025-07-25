# Mower Simulator

This project is a web-based simulator for controlling autonomous lawnmowers on a rectangular grid. It provides a visual interface for uploading mower instructions and watching a step-by-step animation of the simulation.

## Tech Stack

-   **Framework**: React (v19) with Vite
-   **Language**: TypeScript
-   **UI Library**: Material-UI (MUI) for components and styling
-   **Validation**: Zod for type-safe parsing and validation of input files
-   **Testing**: Jest and Testing Library for unit and end-to-end tests

## How to Run

### 1. Installation

Clone the repository and install the required dependencies using npm:

```bash
npm install
```

### 2. Running the Development Server

To start the application in development mode, run the following command. The application will be available at `http://localhost:5173`.

```bash
npm run dev
```

### 3. Running Tests

To execute the test suite and ensure all logic is working as expected, run:

```bash
npm test
```

### Input File Format

The `.txt` file must be structured as follows:

-   **Line 1**: The coordinates of the top-right corner of the lawn (e.g., `55`). The bottom-left corner is assumed to be `00`.
-   **Succeeding Lines**: Pairs of lines for each mower.
    -   The first line of the pair is the mower's initial position and orientation (e.g., `12 N`).
    -   The second line is the sequence of commands (`L`, `R`, `F`) without spaces (e.g., `LFLFLFLFF`).

**Example `input.txt`:**

```
55
12 N
LFLFLFLFF
33 E
FFRFFRFRRF
```
