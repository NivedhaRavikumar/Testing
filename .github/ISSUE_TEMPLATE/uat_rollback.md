---
name: DSX UAT Deployment Rollback
about: A rollback of a DSX UAT Deployment.
title: Rollback YYYY-MM-DD in UAT from vx.x.x to vy.y.y
labels:
  - 'environment:uat'
  - 'rollback'
---

## Aim

This is to test the rollback of DSX to previous version in case of any deployment failures.

Rollback from vx.x.x to vy.y.y for Launch <name with URL>

**Slack threads:**

- <thread 1>
- <thread 2>

Please refer the [DSX UAT Rollback Testing](https://cautious-fortnight-2p91v1r.pages.github.io/playbooks/infrastructure/dsx-uat-rollback-testing-steps.html) playbook to check the outcomes expected for each step.

## Steps to follow for down migration against PROD DB

- [ ] Inform in Slack channel `dsx-uat-deploy` regarding the rollback.

      Ex: `We are doing rollback testing in UAT from vx.x.x to vy.y.y. Please let us know if any concerns.`
- [ ] Backup PROD database.

<details><summary>How to Create a Database Backup</summary>

[Activate PIM](https://portal.azure.com/#view/Microsoft_Azure_PIMCommon/ActivationMenuBlade/~/azurerbac) for Resource `MAHSBC-RGP-0058-ENP0102-ST_DS_EXCHANGE` with Role `MAHSBC Contributor 1h - v01`

In the same browser tab that was used to request the activated PIM, navigate to the [current PROD database (`enp0102-sqldb (enp0102-sql01/enp0102-sqldb)`)](https://portal.azure.com/#@shellcorp2.onmicrosoft.com/resource/subscriptions/ca64fad8-c71a-4595-ac29-46632c377269/resourceGroups/MAHSBC-RGP-0058-ENP0102-ST_DS_EXCHANGE/providers/Microsoft.Sql/servers/enp0102-sql01/databases/enp0102-sqldb/overview) and then select `Copy`.

Fill in all the details, but change the name of the copy to include the issue number of the deployment _and_ a failure indicator:

> enp0102-$(ISSUE)-sqldb
> The copy itself will take a few minutes.

</details>

- [ ] Note down the rollback start date and time: YYYY-MM-DD HH:mm UK

### If Repo is not cloned(In case of first rollback in your machine)

- [ ] `git clone https://github.com/sede-x/dsx-webapp-meta.git` under `workspace` in VS code `Git Bash`
- [ ] `cd dsx-webapp-meta`

### If Repo is cloned

- [ ] `cd dsx-webapp-meta`
- [ ] `git checkout master`
- [ ] `git pull`

### Run the Commands/Scripts

- [ ] `az login` and login to `-b` account.
- [ ] Execute command to login to ACR Registry by updating the username and password.

      `docker login end0085registry.azurecr.io -u <username> -p <password>`
- [ ] Export the MSSQL_URL after updating the username and password.

      `export MSSQL_URL='mssql://<username>:<password>@ena0098-sql01.database.windows.net/enp0102-$(ISSUE)-sqldb)-rollback-testing?options.enableArithAbort=true&connectionTimeout=60000&requestTimeout=900000&pool.min=1&pool.max=1'`
- [ ] Execute command to test the database connection.

      `./migrations.sh remote-migrations`
- [ ] Execute command for Up migration by updating the version details.
      
      `./migrations.sh migrate --from vx.x.x --to vy.y.y`
- [ ] Paste the output from the up migration into a comment, using backticks for formatting.
- [ ] Execute command for Down migration by updating the version details.
      
      `./migrations.sh migrate --from vy.y.y --to vx.x.x`
- [ ] Paste the output from the down migration into a comment, using backticks for formatting.
- [ ] Note down the rollback end date and time: YYYY-MM-DD HH:mm UK.

## Present on Call

- [ ] @Anjali1302
- [ ] @bshivshanker
- [ ] @darshanasys
- [ ] @Hiten-shell-2020
- [ ] @Manishkumarraju
- [ ] @mathivanan-nb
- [ ] @markbirbeck
- [ ] @NivedhaRavikumar
- [ ] @prateekpattanaik
- [ ] @sankarshell
