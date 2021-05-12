const formidable = require("formidable");
const fs = require("fs");

export default async (req, res) => {
    const { method, body } = req
    try {
      switch (method) {
        case "GET":
          return res.status(404).json({ error: "Api not found." })
          break
        case "POST":
            let url = ""
            const form = formidable({ multiples: true });
            form.parse(req, async (err, fields, files) => {
                const path = `${process.env.ROOT}/public/applications/${fields.email}`
                let list = path.split(/[\\\/]/);
                let filepath = list.join("/");
                fs.mkdirSync(filepath, { recursive: true }, (err) => {
                    if (err) throw err;
                  });
                const image = `${path}/${files.image.name}`;  
                const oldPath = files.image.path;
                var rawData = fs.readFileSync(oldPath);
                await fs.writeFile(image, rawData, function (err) {
                  if (err) console.log(err);
                });
                const url = `applications/${fields.email}/${files.image.name}`
                res.status(200).json({url})
            })
            
          break
        default:
          return res.status(405).end()
      }
    } catch (error) {
      console.error(error.message)
      res.status(404).end()
    }
  }

  export const config = {
    api: {
      bodyParser: false,
    },
  };