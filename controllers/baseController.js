class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    let frontendData;
    try {
      const results = await this.model.findAll();
      frontendData = {
        data: results,
        modelName: this.model.name,
      };
      if (!results.length) { throw new Error('nothing found'); }
    } catch (err) {
      res.status(400).send('no data found');
      return;
    }
    res.json(frontendData);
  }

  async getOneByParam(req, res) {
    const params = { ...req.params };
    let frontendData;
    try {
      const results = await this.model.findOne({
        where: params,
      });
      frontendData = {
        data: results,
        modelName: this.model.name,
      };
      if (!results) { throw new Error('nothing found'); }
    } catch (err) {
      res.status(400).send('no data found');
      return;
    }
    res.json(frontendData);
  }

  async getAllByParam(req, res) {
    const params = { ...req.params };
    let frontendData;
    try {
      const results = await this.model.findAll({
        where: params,
      });
      frontendData = {
        data: results,
        modelName: this.model.name,
      };
      if (!results) { throw new Error('nothing found'); }
    } catch (err) {
      res.status(400).send('no data found');
      return;
    }
    res.json(frontendData);
  }

  async insertOne(req, res) {
    const toInsert = { ...req.params, ...req.body };
    await this.model.create(toInsert);
    res.send('insert success');
  }
}

module.exports = BaseController;