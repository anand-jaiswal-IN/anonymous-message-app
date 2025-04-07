docker build \
  --build-arg NEXTAUTH_SECRET="Ua5ZbENnrnTBBLxd+YdSbzxWtcu2mclsImCqwWe62NCe0pRyfJyPx2BbiPE=" \
  --build-arg MONGODB_URI="mongodb+srv://anandprofessional:VUifDfNJmaOYaqSi@cluster0.ynd9z.mongodb.net/anonymous-message" \
  --build-arg RESEND_API_KEY="re_QK3WGPkT_MUfJC9m2J35W8K4JnmMr4SQ1" \
  -t anonymous-message-app-prod .
