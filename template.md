---
name: New Business Entity
about: Business Entity Creation.
title: a short phrase describing the creation of new Business Entity
labels:
- "enhancement :sparkles:"
---

<!--

Please add this issue to the 'DSX SRE board' and set the appropriate values for below items

  - Service Class

  - Work Item Type

  - Board

-->

## Description

We need to create and configure a new business entity `[New Business Entity]` for DSX application.

## :white_check_mark: Tasks

### Common for all Environments:

- [ ] double-check the Business Entity name with @sreeharsha1974 and @kachirajus
- [ ] add deployment config for the new business entity
- [ ] create a business entity entry to set the acceptor

### DEV:

- [ ] request AES keys from Jack and the AES team.
- [ ] create a traffic manager entry. 
- [ ] request a DNS entry of [Business_Entity].dsx-dev.shell.com (for example: gcf.dsx-dev.shell.com) which refers to the DEV TM entry.
- [ ] request SSO.
- [ ] add the business entity in DEV database.

### UAT:

- [ ] request AES keys from Jack and the AES team.
- [ ] create a traffic manager entry. 
- [ ] request a DNS entry of [Business_Entity].dsx-uat.shell.com (for example: gcf.dsx-dev.shell.com) which refers to the UAT TM entry.
- [ ] request SSO.
- [ ] add the business entity in UAT database.

### PROD:

- [ ] request AES keys from Jack and the AES team.
- [ ] create a PROD traffic manager entry. 
- [ ] request a DNS entry of [Business_Entity].dsx.shell.com (for example: gcf.dsx-dev.shell.com) which refers to the PROD TM entry.
- [ ] request SSO.
- [ ] add the business entity in PROD database.

## :checkered_flag: Acceptance Criteria

- a business entity [New Business Entity] is available in DEV

- a business entity [New Business Entity] is available in UAT

- a business entity [New Business Entity] is available in PROD

## :notebook: Notes

Add any additional notes, related links, etc.
