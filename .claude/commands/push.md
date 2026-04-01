Stage, commit, and push all current changes to the remote repository.

## Process

1. Run `git status` to see what has changed
2. Run `git diff` to review the changes
3. Run `git log -5 --oneline` to match the existing commit message style
4. Stage all modified/new files (avoid `git add -A` — add specific files by name)
5. Write a concise commit message focused on *why*, not *what*
6. Commit using:
   ```
   git commit -m "$(cat <<'EOF'
   <message here>

   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```
7. Push to the current branch: `git push`

## Rules
- Always commit as: name=`hieppq`, email=`hieppq@athena.studio` (already set in local git config)
- Never use `--no-verify` or force push to main/master
- If there is nothing to commit, say so and skip
- If $ARGUMENTS is provided, use it as the commit message instead of generating one
