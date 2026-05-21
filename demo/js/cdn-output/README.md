# vnpay-mini-app-cdn

CDN bundle artifacts cho TrainMiniAppReactJS (mini-app H5). Mỗi package tương ứng 1
thư viện externalized — file `.min.js` được serve qua jsDelivr / Netlify / Cloudflare
Pages, app load qua thẻ `<script defer src="...">` được inject tự động ở build time.

## URL pattern

```
<base>/<package-name>/dist/<version>/<short-name>-<version>.min.js
```

Ví dụ:
- `<base>/vnpay-preact-lib/dist/10.19.3/vnpay-preact-10.19.3.min.js`
- `<base>/vnpay-vnxjs-runtime-lib/dist/3.5.66/vnpay-vnxjs-runtime-3.5.66.min.js`
- `<base>/vnpay-vnmfify-core-lib/dist/0.1.0-a37/vnpay-vnmfify-core-0.1.0-a37.min.js`

## jsDelivr (sau khi push lên GitHub + tag)

```
https://cdn.jsdelivr.net/gh/<user>/<repo>@<tag>/<package-name>/dist/<version>/<file>.min.js
```

App build dùng env override:

```bash
CDN_BASE_URL=https://cdn.jsdelivr.net/gh/<user>/<repo>@<tag> \
  vnmf build --type h5
```

## Build & publish

Source repo: `multi-lib-cdn`.

```bash
# Build all packages + collect vào cdn-output/
pnpm build

# Commit + tag + push
cd cdn-output
git add -A
git commit -m "build $(date +%Y-%m-%d)"
git tag v$(date +%Y%m%d)
git push && git push --tags
```

jsDelivr cache theo immutable URL khi pin tag, nên mỗi release dùng tag mới.

## Đóng góp

Không edit trực tiếp trong repo này — đây chỉ là artifact deploy. Mọi thay đổi
phải từ source workspace rồi `pnpm build` để regenerate.
