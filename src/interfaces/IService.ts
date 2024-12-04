export interface Service {
    id: string;
    vehicle_id: string;         // FK to Vehicles.id
    description: string;
    state: State;
    startedAt: string;
    endedAt: string;
}

enum State {
    REGISTERED,
    IN_PROGRESS,
    COMPLETED
}