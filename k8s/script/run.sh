#!/bin/bash

resource_type="$1"
branch="$2"

cd k8s

pwd

config_name="${branch}-${resource_type}"

config_path="${resource_type}s/${config_name}.yaml"

if kubectl get deployment "frontend-$config_name" &>/dev/null; then
    kubectl rollout restart deployment "frontend-$config_name"
else
    kubectl apply -f "$config_path"
fi

if [ "$resource_type" == "service" ]; then
    service_name="frontend-$config_name"

    # Check if the service already exists
    if kubectl get service "$service_name" --no-headers >/dev/null 2>&1; then
        echo "Service $service_name already exists. Skipping..."
    else
        echo "Waiting for an external IP for 40 seconds..."
        sleep 40s
        echo "40 seconds have passed!"
        kubectl get service "$service_name"
    fi
fi
