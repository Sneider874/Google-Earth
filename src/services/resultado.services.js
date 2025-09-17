// Lógica de negocio para Resultados
exports.getFinalWaterMask = async (id) => {
    return { message: `Máscara de agua final para el ID: ${id}` };
};

exports.getHighConfidenceWaterMask = async (id) => {
    return { message: `Máscara de agua de alta confianza para el ID: ${id}` };
};

exports.getJRCSeasonalWaterMask = async (id) => {
    return { message: `Máscara histórica JRC estacional para el ID: ${id}` };
};

exports.getJRCPermanentWaterMask = async (id) => {
    return { message: `Máscara histórica JRC permanente para el ID: ${id}` };
};

exports.getJRCTotalWaterMask = async (id) => {
    return { message: `Máscara histórica JRC total para el ID: ${id}` };
};

exports.getPrincipalRiverNetwork = async (id) => {
    return { message: `Red hidrográfica de ríos principales para el ID: ${id}` };
};

exports.getMediumRiverNetwork = async (id) => {
    return { message: `Red hidrográfica de ríos medianos para el ID: ${id}` };
};

exports.getSmallRiverNetwork = async (id) => {
    return { message: `Red hidrográfica de ríos pequeños para el ID: ${id}` };
};

exports.getRavineNetwork = async (id) => {
    return { message: `Red hidrográfica de quebradas para el ID: ${id}` };
};