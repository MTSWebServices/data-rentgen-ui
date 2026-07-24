#!/bin/bash

DATA_RENTGEN_CONFIG_FILE=${DATA_RENTGEN_CONFIG_FILE:-/app/config.yml}
DATA_RENTGEN__UI__API_BROWSER_URL_DEFAULT="http://localhost:8000"
DATA_RENTGEN__UI__AUTH_PROVIDER_DEFAULT="dummyAuthProvider"

if [[ -f "${DATA_RENTGEN_CONFIG_FILE}" ]]; then
    DATA_RENTGEN__UI__API_BROWSER_URL=$(yq ".ui.api_browser_url // \"${DATA_RENTGEN__UI__API_BROWSER_URL_DEFAULT}\"" "${DATA_RENTGEN_CONFIG_FILE}")
else
    DATA_RENTGEN__UI__API_BROWSER_URL=${DATA_RENTGEN__UI__API_BROWSER_URL:-$DATA_RENTGEN__UI__API_BROWSER_URL_DEFAULT}
fi

if [[ -f "${DATA_RENTGEN_CONFIG_FILE}" ]]; then
    DATA_RENTGEN__UI__AUTH_PROVIDER=$(yq ".ui.auth_provider // \"${DATA_RENTGEN__UI__AUTH_PROVIDER_DEFAULT}\"" "${DATA_RENTGEN_CONFIG_FILE}")
else
    DATA_RENTGEN__UI__AUTH_PROVIDER=${DATA_RENTGEN__UI__AUTH_PROVIDER:-$DATA_RENTGEN__UI__AUTH_PROVIDER_DEFAULT}
fi

cat <<EOF > /usr/share/nginx/html/env-config.js
window.env = {
  API_URL: "${DATA_RENTGEN__UI__API_BROWSER_URL}",
  AUTH_PROVIDER: "${DATA_RENTGEN__UI__AUTH_PROVIDER}",
};
EOF

sed -i '/<\/head>/i \    <script src="/env-config.js"></script>' /usr/share/nginx/html/index.html

exec "$@"
