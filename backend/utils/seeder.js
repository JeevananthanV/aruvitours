const fs = require('fs');
const path = require('path');
const Package = require('../models/Package');

const seedPackages = async () => {
  try {
    const count = await Package.countDocuments();
    if (count > 0) {
      console.log('Database already has packages. Skipping seed.');
      return;
    }

    const filePath = path.join(__dirname, '../../frontend/src/data/packagesData.js');
    if (!fs.existsSync(filePath)) {
      console.log(`packagesData.js not found at ${filePath}. Skipping seed.`);
      return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Convert ESM export to CommonJS module exports to parse
    const jsContent = fileContent
      .replace(/export default packagesData;?/, 'module.exports = packagesData;')
      .replace(/const packagesData = /, 'var packagesData = ');
    
    let data;
    try {
      const tempModule = { exports: {} };
      const runFn = new Function('module', 'exports', jsContent);
      runFn(tempModule, tempModule.exports);
      data = tempModule.exports;
    } catch (e) {
      console.error('Failed to parse packagesData.js:', e);
      return;
    }

    if (!Array.isArray(data)) {
      console.error('Parsed packages data is not an array.');
      return;
    }

    // Map each package item to the Package schema
    const formattedPackages = data.map(pkg => ({
      title: pkg.name,
      slug: pkg.slug,
      destination: pkg.name,
      duration: pkg.duration || 'N/A',
      price: typeof pkg.startingPrice === 'string' 
        ? Number(pkg.startingPrice.replace(/[^0-9]/g, '')) 
        : (pkg.startingPrice || 0),
      description: pkg.shortDescription || '',
      images: pkg.images || [pkg.image],
      category: pkg.category,
      featured: pkg.featured || false,
      inclusions: pkg.highlights || []
    }));

    await Package.insertMany(formattedPackages);
    console.log(`Successfully seeded ${formattedPackages.length} packages into MongoDB!`);
  } catch (err) {
    console.error('Error seeding packages:', err);
  }
};

module.exports = seedPackages;
