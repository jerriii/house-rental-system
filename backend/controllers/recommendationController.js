const {recommendPropertiesForTenant} = require("./cosineSimilarity");

async function getRecommendations(tenantId) {
    const recommendations = await recommendPropertiesForTenant(tenantId);
    console.log("Recommended Properties:", recommendations);
}