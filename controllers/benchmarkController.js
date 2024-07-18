const Benchmark = require('../models/Benchmark');

exports.getBenchmarks = async (req, res) => {
  try {
    const benchmarks = await Benchmark.findAll();
    res.json(benchmarks);
  } catch (error) {
    console.error('Error fetching benchmarks:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createOrUpdateBenchmark = async (req, res) => {
  try {
    const { itemCode, benchmark } = req.body;

    // Check if the benchmark already exists
    const existingBenchmark = await Benchmark.findOne({ where: { itemCode } });

    if (existingBenchmark) {
      // Update the existing benchmark if the value has changed
      if (existingBenchmark.benchmark !== benchmark) {
        existingBenchmark.benchmark = benchmark;
        await existingBenchmark.save();
      }
      return res.json(existingBenchmark);
    }

    // Create a new benchmark
    const newBenchmark = await Benchmark.create({ itemCode, benchmark });
    res.json(newBenchmark);
  } catch (error) {
    console.error('Error creating or updating benchmark:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateBenchmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { benchmark } = req.body;
    await Benchmark.update({ benchmark }, { where: { id } });
    const updatedBenchmark = await Benchmark.findByPk(id);
    res.json(updatedBenchmark);
  } catch (error) {
    console.error('Error updating benchmark:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBenchmark = async (req, res) => {
  try {
    const { id } = req.params;
    await Benchmark.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting benchmark:', error);
    res.status(500).json({ error: error.message });
  }
};
