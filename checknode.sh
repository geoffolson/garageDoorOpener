node -v
if [ $? -eq 0 ]; then
    echo "node is installed";
else
    echo "node is not installed";
fi