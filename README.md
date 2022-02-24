
# PolyMC Instance Manager

This is web based manager for instances in [PolyMC](https://github.com/polymc/polymc).

## Deployment
Requirements:
- nodejs
- npm (or any alternative)

To deploy this project

first clone it
```bash
git clone https://github.com/tonyaellie/polymc-instance-manager.git
```

then cd into the directory it was installed into
```bash
cd polymc-instance-manager
```

install dependencies
```bash
npm i
```

set the path to PolyMC, replace `pathtopolymc` with the path e.g. `/home/tonya/.var/app/org.polymc.PolyMC/data/polymc`
```bash
nano utils/config.ts
```

build
```bash
npm run build
```

and run
```bash
npm run start
```
## To Do
- [ ] Add the ability to upload instances
- [ ] Make everything look good
- [ ] Show instance icons
- [ ] Add option to export/import multiple instances