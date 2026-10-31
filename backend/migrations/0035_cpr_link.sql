-- 互联公开权限随 Key 保存
alter table client_api_keys
  add column peer_sharing_json jsonb not null
  default '{"enabled":false,"sharePool":false,"shareQuota":false,"sharePlans":false}';

-- 各额度来源共用当前快照，协议入口另行限制响应大小
alter table provider_accounts drop constraint provider_accounts_quota_ck;
alter table provider_accounts add constraint provider_accounts_quota_ck check (
  provider_quota_json is null or (
    jsonb_typeof(provider_quota_json) = 'object'
    and octet_length(provider_quota_json::text) <= 8388608
  )
);
