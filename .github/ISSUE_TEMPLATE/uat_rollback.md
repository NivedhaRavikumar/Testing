---
name: DSX UAT Deployment Rollback
about: A rollback of a DSX UAT Deployment.
title: Rollback YYYY-MM-DD in UAT
labels: 
- 'environment:uat'
- 'rollback'
---

# Aim

This is to test the rollback of DSX to previous version in case of any deployment failures.

Rollback from vx.x.x to vy.y.y for Launch <name with URL>

Slack threads:
  - <thread 1>
  - <thread 2>

# Steps to follow for down migration against PROD DB 

* [ ] Inform in Slack channel `dsx-uat-deploy`
      Eg: "We are doing rollback testing in UAT from vx.x.x to vy.y.y. Please let us know if any concerns."
* [ ] Note down the rollback start date and time: YYYY-MM-DD Hr:Mi UK
* [ ] Backup PROD database

<details><summary>How to Create a Database Backup</summary>

[Activate PIM](https://portal.azure.com/#view/Microsoft_Azure_PIMCommon/ActivationMenuBlade/~/azurerbac) for Resource `MAHSBC-RGP-0058-ENP0102-ST_DS_EXCHANGE` with Role `MAHSBC Contributor 1h - v01`

In the same browser tab that was used to request the activated PIM, navigate to the [current PROD database (`enp0102-sqldb (enp0102-sql01/enp0102-sqldb)`)](https://portal.azure.com/#@shellcorp2.onmicrosoft.com/resource/subscriptions/ca64fad8-c71a-4595-ac29-46632c377269/resourceGroups/MAHSBC-RGP-0058-ENP0102-ST_DS_EXCHANGE/providers/Microsoft.Sql/servers/enp0102-sql01/databases/enp0102-sqldb/overview) and then select `Copy`.

Fill in all the details, but change the name of the copy to include the issue number of the deployment _and_ a failure indicator:

> enp0102-$(ISSUE)-sqldb
The copy itself will take a few minutes.
</details>
* [ ] Note down date and time: YYYY-MM-DD Hr:Mi UK

## If not cloned(In case of first rollback in your machine)

* [ ] `git clone https://github.com/sede-x/dsx-webapp-meta.git` under `workspace` in VScode `Git Bash`

## If already cloned

* [ ] `git checkout master`
* [ ] `git pull`

## Run the commands/scripts

* [ ] Note down date and time: YYYY-MM-DD Hr:Mi UK
* [ ] `cd dsx-webapp-meta`
* [ ] Export the MSSQL_URL
        Ex: `export MSSQL_URL='mssql://dsx_acc_xxxx:xxxx@ena0098-sql01.database.windows.net/enp0102-$(ISSUE)-sqldb)-rollback-testing?options.enableArithAbort=true&connectionTimeout=60000&requestTimeout=900000&pool.min=1&pool.max=1`
* [ ] `az login` and login to `-b` account.
* [ ] Execute command to login to ACR Registry
       Ex: `docker login end0085registry.azurecr.io -u <username> -p <password>`
* [ ] Execute command to test the database connection
       - `./migrations.sh remote-migrations`
* [ ] Execute command for Up migration 
       Ex: `./migrations.sh migrate --from vxx.x.x --to vxx.x.x`
* [ ] Paste the output from the up migration into a comment, using backticks for formatting.
* [ ] Execute command for Down migration 
       Ex: `./migrations.sh migrate --from vxx.x.x --to vxx.x.x`
* [ ] Paste the output from the down migration into a comment, using backticks for formatting.
* [ ] Note down the rollback end date and time: YYYY-MM-DD Hr:Mi UK.

# Present on Call

* [ ] @Anjali1302
* [ ] @bshivshanker
* [ ] @darshanasys
* [ ] @Hiten-shell-2020
* [ ] @Manishkumarraju 
* [ ] @mathivanan-nb
* [ ] @markbirbeck
* [ ] @NivedhaRavikumar
* [ ] @prateekpattanaik
* [ ] @sankarshell
