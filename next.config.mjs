const nextConfig = {
  webpack: (config, { isServer }) => {
    // İleride webpack ayarlarını genişletmek için burayı kullanabilirsiniz
    return config;
  },
  images: {
    domains: ['i.pinimg.com'], // Resim alan adlarını burada ekleyin
  },
};

export default nextConfig;
