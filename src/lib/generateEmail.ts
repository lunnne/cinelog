export function generateTemporaryEmail(provider: string, providerAccountId: string) {
    return `${provider}_${providerAccountId}@temp.social`;
  }
  