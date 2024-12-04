export function formatUuid(uuid: Buffer) {
    // Convierte el UUID de Buffer a string en formato hexadecimal
    const uuidString = uuid.toString('hex');

    // Opcional: Formatea el UUID con guiones
    const formattedUuid = [
        uuidString.slice(0, 8),
        uuidString.slice(8, 12),
        uuidString.slice(12, 16),
        uuidString.slice(16, 20),
        uuidString.slice(20)
    ].join('-');

    return formattedUuid;
}