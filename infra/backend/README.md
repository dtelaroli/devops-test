# Backend

Initial project for terraform. Includes:

- S3 Bucket for terraform states
- DynamoDb table for terraform locks

It's haven't a sandbox environment and its state is saved local and versioned on git.

## Using

```
$ make init_prd
$ make apply_prd
```
