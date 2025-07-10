import fs from 'fs';
import path from 'path';
import { swaggerSpec } from '../src/config/swagger';

const generateSwaggerJSON = () => {
  const swaggerJson = JSON.stringify(swaggerSpec, null, 2);
  const outputPath = path.join(__dirname, '../public/swagger.json');
  
  // Ensure public directory exists
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  
  fs.writeFileSync(outputPath, swaggerJson);
  console.log('✅ Swagger JSON generated at:', outputPath);
  console.log('🚀 You can now import this file into Swagger Hub');
};

generateSwaggerJSON(); 