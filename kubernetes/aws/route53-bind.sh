#!/bin/bash -e
#
#  Author: Peycho Dimitrov
#
#  DESCRIPTION
#
#  Create full backup of all hosted Route53 zones / domains in your account.
#
#  REQUIREMENTS
#
#  Available s3 bucket (where your json files will be saved)
#  awscli (with cofigured credentials or IAM role)
#  gzip
#  awk
#
####################################

#  CONFIGURATION

region="us-east-2" # Your aws region
b_route53_tmp="/tmp/r53_backup" # Your temp directory
b_route53_bucket="s3://de-gmi/route53" # Your backup folder in s3.

# END OF CONFIGURATION

# Do not edit here if you don't know what your're doing! #

mkdir -p $b_route53_tmp
echo "$(date) Backup all Route53 zones and resource records."
p_aws="$(which aws) --region $region"
r53_zones=$($p_aws route53 list-hosted-zones --query '[HostedZones[*].[Id, Name]]' --output text | awk -F'/' '{print $3}')
if [ ! -z "$r53_zones" ]; then
        while read route; do
                zone=$(echo "$route" | awk '{print $1}')
                domain=$(echo "$route" | awk '{print $2}')
                echo "Processing $zone / $domain"
                $p_aws route53 list-resource-record-sets --hosted-zone-id "$zone" --output json > "$b_route53_tmp"/$(date +%Y%m%d%H%M%S)-"$zone"-"$domain"backup.json
        done <<<"$r53_zones"

        echo "Archive json files."
        cp "$b_route53_tmp"/*backup.json "$b_route53_tmp"/*backup-orig.json
        gzip "$b_route53_tmp"/*backup.json
        echo "Backup $zone / $domain data to $b_route53_bucket/$(date +%Y)/$(date +%m)/$(date +%d)/"
        $p_aws s3 cp "$b_route53_tmp"/ $b_route53_bucket/$(date +%Y)/$(date +%m)/$(date +%d)/ --exclude "*" --include "*.json" --recursive
        $p_aws s3 cp "$b_route53_tmp"/ $b_route53_bucket/$(date +%Y)/$(date +%m)/$(date +%d)/ --exclude "*" --include "*.gz" --recursive
fi

echo "$(date) Done!"