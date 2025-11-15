export function generateUsername(provider: string, providerAccountId: string) {
    return `${provider}_${providerAccountId}`; 
  }