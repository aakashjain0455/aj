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

exports.createBenchmark = async (req, res) => {
  try {
    const { itemCode, benchmark } = req.body;
    const newBenchmark = await Benchmark.create({ itemCode, benchmark });
    res.json(newBenchmark);
  } catch (error) {
    console.error('Error creating benchmark:', error);
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
